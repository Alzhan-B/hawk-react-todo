import { useEffect, useState } from "react";
import style from "./Home.module.css";
import taskManagementImage from "../assets/images/unsplash.jpg";

const Home = () => {
    const [times, setTimes] = useState({
    est: "",
    cdt: "",
    pst: "",
  });

 
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setTimes({
        est: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'America/New_York' }).format(now),
        cdt: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'America/Chicago' }).format(now),
        pst: new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'America/Los_Angeles' }).format(now),
      });
    };

    const intervalId = setInterval(updateTime, 1000);
    updateTime(); 
 
  return () => clearInterval(intervalId); 
}, []);

return (
  <div className={style.mainContainer}>
    <div className={style.intro}>
      <div>
        <h1 className={style.title}>Welcome to Our App</h1>
        <p className={style.description}>
          Explore our features and start managing your tasks effectively!
        </p>

      </div>
      <div className={style.imageContainer}>
          <img
            src={taskManagementImage}
            alt="Task Management Illustration"
            className={style.image}
          />
      </div>
    </div>
    <div className={style.currentTimeContainer}>
        <p>Current Times:</p>
        <ul className={style.currentTime}>
          <li>EST: {times.est}</li>
          <li>CDT: {times.cdt}</li>
          <li>PST: {times.pst}</li>
        </ul>
      </div>
    <div className={style.gridContainer}>
      <div className={style.featureItem}>
        <h2>Todo List</h2>
        <p>Manage your tasks</p>
        <a href="/todos" className={style.buttonLink}>Go to Todo List</a>
      </div>
      <div className={style.featureItem}>
        <h2>Feature 2</h2>
        <p>Coming soon!</p>
      </div>
      <div className={style.featureItem}>
        <h2>Feature 3</h2>
        <p>Coming soon!</p>
      </div>
      <div className={style.featureItem}>
        <h2>Feature 4</h2>
        <p>Coming soon!</p>
      </div>
    </div>
    <div className={style.sideMenu}>
     
     
    </div>
  </div>
);
};

export default Home;