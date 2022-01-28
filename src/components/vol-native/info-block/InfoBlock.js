import React from "react";

const InfoBlock = (props) => {
  const { char } = props;

  const infoBlockStyle = {
    margin: "10px",
    marginLeft: "23px",
    padding: "5px",
    width: "350px",
    textAlign: "left",
  };
  return (
    <div
      style={infoBlockStyle}
      className="border border-warning border border-3 ">
      <h1>INFO</h1>
      <p>
        Выбран персонаж: <b>{`${char.name}`}</b>
      </p>
      <p>
        Культура: <b>{`${char.culture}`}</b>
      </p>
      <p>
        Дата рождения: <b>{char.born}</b>
      </p>
      <p>
        Дата смерти: <b>{char.died}</b>
      </p>
      <p>
        Титул: <b>{char.titles}</b>
      </p>
      <p>
        Прозвище: <b>{char.aliases}</b>
      </p>
    </div>
  );
};

export default InfoBlock;

// {
//   "url": "https://www.anapioficeandfire.com/api/characters/823",
//   "name": "Petyr Baelish",
//   "culture": "Valemen",
//   "born": "In 268 AC, at the Fingers",
//   "died": "",
//   "titles": [
//     "Master of coin (formerly)",
//     "Lord Paramount of the Trident",
//     "Lord of Harrenhal",
//     "Lord Protector of the Vale"
//   ],
//   "aliases": [
//     "Littlefinger"
//   ],
//   "father": "",
//   "mother": "",
//   "spouse": "https://www.anapioficeandfire.com/api/characters/688",
//   "allegiances": [
//     "https://www.anapioficeandfire.com/api/houses/10",
//     "https://www.anapioficeandfire.com/api/houses/11"
//   ],
//   "books": [
//     "https://www.anapioficeandfire.com/api/books/1",
//     ...
//   ],
//   "povBooks": [],
//   "tvSeries": [
//     "Season 1",
//     "Season 2",
//     "Season 3",
//     "Season 4",
//     "Season 5"
//   ],
//   "playedBy": [
//     "Aidan Gillen"
//   ]
// }
