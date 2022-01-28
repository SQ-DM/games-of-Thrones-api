import React from "react";
import Arrows from "../arrows-direction/Arrows";

const Tables = (props) => {
  const content = props.characters.map((char, index) => {
    const name = char.name ? char.name : "no data :(";
    const gender = char.gender ? char.gender : "no data :(";
    const culture = char.culture ? char.culture : "no data :(";
    const born = char.born ? char.born : "no data :(";
    const died = char.died ? char.died : "no data :(";
    return (
      <tr key={index} onClick={() => props.getInfo(char)}>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{culture}</td>
        <td>{born}</td>
        <td>{died}</td>
      </tr>
    );
  });

  return (
    <table className="table table-bordered border-primary table table-hover m-3">
      <thead>
        <tr>
          {/* <th scope="col">Id</th> */}
          <th onClick={() => props.onSort("name")}>
            Name <Arrows direction={props.direction} />
          </th>
          <th onClick={() => props.onSort("gender")}>
            Gender <Arrows direction={props.direction} />
          </th>
          <th onClick={() => props.onSort("culture")}>
            Culture <Arrows direction={props.direction} />
          </th>
          <th onClick={() => props.onSort("born")}>
            Born <Arrows direction={props.direction} />
          </th>
          <th onClick={() => props.onSort("died")}>
            Died <Arrows direction={props.direction} />
          </th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default Tables;
