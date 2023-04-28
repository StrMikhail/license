import React, { useState } from 'react';
import styles from './removeUser.module.css';
import cn from 'classnames';
import { Button, Typography } from 'antd';

const RemoveUser = ({ userList, onDelete }) => {
    const [deleteList, setDeleteList] = useState([]);

    const addToDeleteList = (item) => {
        if (deleteList.includes(item)) {
            return setDeleteList((prev) => prev.filter((user) => user !== item));
        }
        setDeleteList((prev) => [...prev, item]);
    };

    const handleClick = () => {
        onDelete(deleteList);
    };

    return (
        <>
            <Typography.Title level={4}>Удаление пользователя</Typography.Title>
            <div className={styles.row}>
                {userList &&
                    userList.map((user) => (
                        <div
                            key={user}
                            className={cn(
                                styles.content,
                                deleteList.includes(user) ? styles.checked : null,
                            )}
                            onClick={() => addToDeleteList(user)}>
                            {user}
                            {deleteList.includes(user) && (
                                <span className={styles.delete}> пользователь будет удален </span>
                            )}
                        </div>
                    ))}
            </div>
            <Button
                size="large"
                disabled={deleteList.length ? false : true}
                onClick={handleClick}
                type="primary"
                block>
                Удалить
            </Button>
        </>
    );
};

export default RemoveUser;
