import classes from "./footer.module.css";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { GiSilverBullet } from "react-icons/gi";
import { GoSearch } from "react-icons/go";

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <a
        rel="NRAsafety"
        href="https://gunsafetyrules.nra.org/"
        alt="NRA Safety"
        target="_blank"
      >
        <AiOutlineSafetyCertificate
          color="#708238"
          size="40px"
          style={{ padding: "20px" }}
        />
      </a>
      <a
        rel="Ammo"
        href="https://www.freedommunitions.com/"
        alt="Buy Ammo"
        target="_blank"
      >
        <GiSilverBullet
          color="#708238"
          size="40px"
          style={{ padding: "20px" }}
        />
      </a>
      <a
        rel="Wheretoshoot"
        href="https://www.wheretoshoot.org/"
        alt="Where to Shoot"
        target="_blank"
      >
        <GoSearch color="#708238" size="40px" style={{ padding: "20px" }} />
      </a>
    </div>
  );
};

export default Footer;
