import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styles from "../Home/browsing.module.css";
import Categories from "../../components/categories/categories";
import Footer from "../../components/footer/footer.js";
import CategoryItem from "../../components/categoryitems/categoryitem";

export default function HomePage() {
  return (
    <div className={styles.browsingpage}>
      <link
        href="https://fonts.googleapis.com/css?family=Cabin"
        rel="stylesheet"
      ></link>
      <div className={styles.backgroundgradient}></div>
      <div className={styles.imagebanner}>
        <img
          src="/thumbnail/homeimg.png"
          alt="Shop Now"
          className={styles.bannerimg}
        />
      </div>
      <div className={styles.categorylist}>
        <Categories />
      </div>
      <div className="ending-line"></div>
      <Footer />
    </div>
  );
}
