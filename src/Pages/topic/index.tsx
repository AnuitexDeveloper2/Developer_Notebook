import React from 'react';

import "./index.css";

const TopicPage = () => {
  return (
    <main className="topic-page-wrapper">
      <aside className="sidebar">
        <nav className="nav">
          <ul>
            <li className="active">
              <a className="topic-theme" href="#">Welcome</a>
            </li>
            <li>
              <a className="topic-theme"  href="#">Who We Are</a>
            </li>
            <li>
              <a className="topic-theme"  href="#">What We Do</a>
            </li>
            <li>
              <a className="topic-theme"  href="#">Get In Touch</a>
            </li>
          </ul>
        </nav>
      </aside>

      <section className="twitter">
       
      </section>
    </main>
  );
};

export default TopicPage