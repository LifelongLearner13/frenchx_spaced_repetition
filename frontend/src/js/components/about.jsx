import React, {PropTypes} from 'react';
import {Link} from 'react-router'

export default function About(props) {

  const {onLoginClick} = props;

  return (
    <div className="about">
      <heading>
        <img className="logo about-logo" src="img/huttstone_logo.png" alt="Hutt Stone"/>
        <h1 className="about-header">Not so long ago in a web development bootcamp close by ...</h1>
      </heading>

      <p>Three padawans decided to use their skills in ReactJS, Redux, NodeJS, and MongoDB to help aspiring entrepreneurs learn Huttese</p>
      <p>Hutt Stone uses a
        <a href="https://en.wikipedia.org/wiki/Spaced_repetition">spaced repition</a>
        algorithm to improve a user's retension of information. Words are presented in Huttese and users are are encoraged to input the equivalent Basic (aka. English) alternative. Once a user has mastered a word, it will appear less and less frequently during training, allowing the user to focus on new words.</p>

      <h2 className="about-header">Disclaimer</h2>

      <p>This project was built for educational purposes only. Star Wars and all asociated characters belong to Disney and 20th Century Fox.</p>

      <h2 className="about-header">Credits</h2>
      <ul className="credits">
        <li>Logo Font:
          <a href="http://www.fontspace.com/boba-fonts/star-jedi">Star Jedi</a>
          by Boba Fonts</li>
        <li>Huttese Language:
          <a href="http://www.completewermosguide.com/huttdictionary.html">The Complete Wermo's HUTTESE DICTIONARY</a>
        </li>
        <li>Portrait:
          <a href="https://mightyjabba.com/2010/07/20/jabba-the-robber-baron-late-19th-century-jabba-by-greg-peltz/">"Jabba the Robber Baron"</a>
          by Greg Peltz</li>
      </ul>

      <Link className="about-back-link about-link bl-base" to={'/'}>Back</Link>
    </div>
  );
};
