import React from "react";
import Tables from "./components/vol-native/tables/Tables";
import Spinner from "./components/vol-native/spinner/Loader";
import Button from "./components/vol-native/main-button/PointToEnter";
import SearchPanel from "./components/vol-native/filter/Filter";
import InfoBlock from "./components/vol-native/info-block/InfoBlock";
import AddCharacter from "./components/vol-native/add-form/AddCharacter";
import ReactPaginate from "react-paginate";
//import BasicTable from "./components/vol-mui/tables-mui/TablesMui";

import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      loading: true,
      direction: false,
      showTables: true,
      filter: "",
      charInfo: null,
      char: null,
      charOnPage: 10,
      currentPage: 1,
      currentChars: [],
    };
  }

  //.1 -----------Фукнция получения данных с сервера
  async fetchData() {
    //а.--> получение данных
    const randomPage = Math.floor(Math.random() * 50 + 1);
    const url = `https://www.anapioficeandfire.com/api/characters?page=${randomPage}&pageSize=100`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }
    const data = await response.json();

    //б.--> расчитываем данные для пагинации
    const setPageCount = Math.ceil(data.length / this.state.charOnPage);

    //в.--> заносим данные в state (обновляем state)
    this.setState({
      characters: data,
      loading: false,
      numberOfPage: setPageCount,
    });
  }

  //2.-----------Функция сортировки
  onSort = (field) => {
    const { characters, direction } = this.state;
    const char = [...characters];
    this.setState({
      direction: !direction,
    });

    if (direction) {
      const sortFields = char.sort((a, b) => {
        return a[field] > b[field] ? 1 : -1;
      });

      this.setState({
        characters: sortFields,
      });
    }

    if (direction === false) {
      this.setState({
        characters: char.reverse(),
      });
    }
  };

  //3.---------Функция изменения свойства состояния showTables для реагирования на клик кнопки компонента <Button/>
  onShowData = () => {
    this.setState({
      showTables: !this.state.showTables,
    });
    this.fetchData();
  };

  //4.---------Функционал фильтрации через компонента <Filter/>
  //a.------->Функция передачи свойства состояния inputValue из компонента Filter в этот компонент
  onGettingInputValue = (inputValue) => {
    this.setState({
      filter: inputValue,
    });
  };
  //b.-------->Функция фильтрации данных полученных уже после обновления состояния
  onFilterCharacters = () => {
    const { characters, filter } = this.state;
    if (!filter) {
      return characters;
    }
    return characters.filter((char) => {
      return (
        char["name"].toLowerCase().includes(filter.toLowerCase()) ||
        char["gender"].toLowerCase().includes(filter.toLowerCase()) ||
        char["culture"].toLowerCase().includes(filter.toLowerCase()) ||
        char["born"].toLowerCase().includes(filter.toLowerCase()) ||
        char["died"].toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  //.5--------->Функция(callback) принимающая данные по клику на поле персонажа в таблице компонента <Tables/> и изменения свойства charInfo состояния
  getInfo = (char) => {
    this.setState({
      charInfo: char,
    });
  };

  //.6---------->Функция(callback) добавления свойств компонента <AddCharacter/>
  onAddCharacter = ({
    valueName,
    valueGender,
    valueCulture,
    valueBorn,
    valueDied,
  }) => {
    let newChar = {
      name: valueName,
      gender: valueGender,
      culture: valueCulture,
      born: valueBorn,
      died: valueDied,
    };

    this.setState(({ characters }) => {
      const newPersons = [...characters, newChar];
      return {
        characters: newPersons,
      };
    });
  };

  handlePageClick = ({ selected }) => {
    const { characters, charOnPage } = this.state;

    const newOffset = (selected * charOnPage) % characters.length;
    this.setState({
      currentPage: newOffset,
    });
    console.log(this.state.currentChars);
  };

  render() {
    const {
      characters,
      loading,
      showTables,
      direction,
      filter,
      charInfo,
      charOnPage,
      currentPage,
    } = this.state;

    const pageNumber = characters.length >= 10;
    //определение индекса последней страницы
    const lastPageIndex = currentPage + charOnPage;
    //определение индекса первой страницы
    const firstPageIndex = lastPageIndex - charOnPage;

    //определение кол-ва страниц для пагинации
    const pageCount = Math.ceil(characters.length / charOnPage);

    const filteredData = this.onFilterCharacters(characters, filter);
    //определение коментариев на текущей страницы
    const currentCharsPage = filteredData.slice(firstPageIndex, lastPageIndex);

    const paginateRender = pageNumber ? (
      <div className="paginate">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={this.handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    ) : null;

    const uploadedContent = loading ? (
      <Spinner />
    ) : (
      <>
        <AddCharacter onAddCharacter={this.onAddCharacter} />
        <SearchPanel onGettingInputValue={this.onGettingInputValue} />
        <Tables
          characters={currentCharsPage}
          onSort={this.onSort}
          direction={direction}
          getInfo={this.getInfo}
        />
        {paginateRender}
      </>
    );

    const showContent = showTables ? (
      <Button onShowData={this.onShowData} />
    ) : (
      uploadedContent
    );

    const renderCharInfo = charInfo ? <InfoBlock char={charInfo} /> : null;

    return (
      <div className="App">
        <header className="App-header">
          {showContent}
          {renderCharInfo}
        </header>
      </div>
    );
  }
}
