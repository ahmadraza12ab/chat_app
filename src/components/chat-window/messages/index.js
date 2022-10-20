/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessges] = useState(null);
  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = database.ref('/messages');
    messageRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrWithId(snap.val());
        setMessges(data);
      });
    return () => {
      messageRef.off('value');
    };
  }, [chatId]);

  const handleLike = useCallback(async msgId => {
    // console.log('Handle like', msgId);
    try {
      const { uid } = auth.currentUser;
      const messageRef = database.ref(`/messages/${msgId}`);
      let alertMsg;
      await messageRef.transaction(msg => {
        if (msg) {
          if (msg.likes && msg.likes[uid]) {
            msg.likeCount -= 1;
            msg.likes[uid] = null;
            alertMsg = 'Like removed';
          } else {
            msg.likeCount += 1;
            if (!msg.likes) {
              msg.likes = {};
            }
            msg.likes[uid] = true;
            alertMsg = 'Like added';
          }
        }
        return msg;
      });
      Alert.info(alertMsg, 4000);
    } catch (err) {
      Alert.info(`Error occured: ${err.message}`, 4000);
    }
  }, []);

  const handleAdmin = useCallback(
    async uid => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);
      let alertMsg;
      await adminsRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin permission removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Admin permission granted';
          }
        }
        return admins;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  const handleDelete = useCallback(
    async (msgId, file) => {
      if (!window.confirm('Delete this message?')) {
        return;
      }
      const isLast = messages[messages.length - 1].id === msgId;
      const updates = {};

      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }
      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }
      try {
        await database.ref().update(updates);
        Alert.info('Message has been deleted');
      } catch (err) {
        return Alert.error(err.message);
      }
      if (file) {
        try {
          const fileRef = storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (err) {
          Alert.error(err.message);
        }
      }
    },
    [chatId, messages]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages &&
        messages.map(msg => (
          <MessageItem
            key={msg.id}
            message={msg}
            handleAdmin={handleAdmin}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        ))}
    </ul>
  );
};

export default Messages;
