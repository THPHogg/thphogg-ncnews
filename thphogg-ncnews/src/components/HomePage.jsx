import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h3>Welcome to Northcoders News!</h3>
      <p>The home of all things coding, cooking and footy!</p>
      <container>
        <section className="codingSection">
          <h3>Coding</h3>
          <section className="homeCard">
            <p>
              Here is a little bit of information on the great articles you can
              find waiting for you:
            </p>
          </section>
        </section>
        <section className="cookingSection">
          <h3>Cooking</h3>
          <section className="homeCard">
            {' '}
            <p>
              Here is a little bit of information on the great articles you can
              find waiting for you:
            </p>
          </section>
        </section>
        <section className="footySection">
          <h3>Footy</h3>
          <section className="homeCard">
            {' '}
            <p>
              Here is a little bit of information on the great articles you can
              find waiting for you:
            </p>
          </section>
        </section>
      </container>
    </div>
  );
};

export default HomePage;
