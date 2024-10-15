import style from "./Learn.module.css";
import learnCTD from "../assets/images/CTD.jpg";

const Learn = () => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Learn to Code</h1>
      <p className={style.description}>
        Join <strong> Code the Dream </strong> to unlock the world of coding! You will get valuable
        resources and hands-on guidance on how to create amazing applications.
        This is your chance to embark on an exciting coding journey!
      </p>
      <p>Click Image Below</p>
      <a
        href="https://classes.codethedream.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={learnCTD} alt="Get Started" className={style.image} />
      </a>
    </div>
  );
};

export default Learn;
