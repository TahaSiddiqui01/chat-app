import React from 'react'
import styles from '../styles/chat.module.css'

function User() {

    const users = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
        { id: 3, name: 'User 3' },
        { id: 4, name: 'User 4' },
    ];
    return (
        <>
            <div className={styles['users-box']}>
                <h2>Available Users</h2>
                <ul className={styles['user-list']}>
                    {users.length > 0 ? users.map((user) => (
                        <li key={user.id} className={styles.user}>
                            {user.name}
                        </li>
                    )) : <li className={styles.user}>
                        No user available
                    </li>}
                </ul>
            </div></>
    )
}

export default User