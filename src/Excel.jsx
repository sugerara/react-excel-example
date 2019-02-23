import React, { Component } from 'react';
import './table.css';

const headers = [
  'Book', 'Author', 'Language', 'Published', 'Sales',
];

const initData = [
  ['The Lord of the Rings', 'J. R. R. Tolkien', 'English', '1954–1955', '150 million'],
  ['Le Petit Prince (The Little Prince)', 'Antoine de Saint-Exupéry', 'French', '1943', '140 million'],
  ["Harry Potter and the Philosopher's Stone", 'J. K. Rowling', 'English', '1997', '107 million'],
  ['And Then There Were None', 'Agatha Christie', 'English', '1939', '100 million'],
  ['Dream of the Red Chamber', 'Cao Xueqin', 'Chinese', '1754–1791', '100 million'],
  ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '100 million'],
  ['She: A History of Adventure', 'H. Rider Haggard', 'English', '1887', '100 million'],
];

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: initData,
    };

    this.sort = this.sort.bind(this);
  }

  sort(e) {
    const column = e.target.cellIndex;
    const { rows } = this.state;
    const nextData = Array.from(rows);
    nextData.sort((a, b) => (a[column] > b[column] ? 1 : -1));
    this.setState({ rows: nextData });
  }

  render() {
    const { rows } = this.state;
    console.log(rows);
    return (
      <table>
        <thead onClick={this.sort}>
          <tr>
            {headers.map((title, index) => (<th key={index}>{title}</th>))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (<td key={index}>{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Excel;
