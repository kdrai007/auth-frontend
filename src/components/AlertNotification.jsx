/* eslint-disable react/prop-types */

const AlertNotification = ({ alert }) => {
  return (
    <div
      className={`absolute right-0 mr-2 mt-2 px-5 py-2 text-black rounded-sm ${alert?.type}`}
    >
      {alert && <div>{alert.message}!</div>}
    </div>
  );
};

export default AlertNotification;
