import React from 'react';
import styles from './PinConnectionTable.module.css';

const PinConnectionTable = ({ pinConnections }) => {
  if (!pinConnections || pinConnections.length === 0) return null;

  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>Pin Connection Table</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ATmega32 Pin</th>
              <th>Component Pin</th>
            </tr>
          </thead>
          <tbody>
            {pinConnections.map((conn, index) => (
              <tr key={index}>
                <td><code className={styles.pinCode}>{conn.mcuPin}</code></td>
                <td>{conn.component}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PinConnectionTable;
