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

// const initData = [
//   ['The Lord of the Rings', 'J. R. R. Tolkien', 'English', '1954–1955', 150],
//   ['Le Petit Prince (The Little Prince)', 'Antoine de Saint-Exupéry', 'French', '1943', 140],
//   ["Harry Potter and the Philosopher's Stone", 'J. K. Rowling', 'English', '1997', 107],
//   ['And Then There Were None', 'Agatha Christie', 'English', '1939', 100],
//   ['Dream of the Red Chamber', 'Cao Xueqin', 'Chinese', '1754–1791', 100],
//   ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', 100],
//   ['She: A History of Adventure', 'H. Rider Haggard', 'English', '1887', 100],
// ];

function getDescending(sortby, index, descending) {
  if (sortby === index) {
    return descending ? ' \u2191' : ' \u2193';
  }
  return '';
}

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: initData,
      sortby: null,
      descending: false,
      edit: null, // {row:行番号, cell:列番号}
      search: false,
    };

    this.sort = this.sort.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.save = this.save.bind(this);
  }

  sort(e) {
    const column = e.target.cellIndex;
    const { data, sortby, descending } = this.state;
    const nextData = Array.from(data);
    const nextDescending = sortby === column && !descending;
    nextData.sort((a, b) => {
      if (nextDescending) {
        return (a[column] < b[column] ? 1 : -1);
      }
      return (a[column] > b[column] ? 1 : -1);
    });
    this.setState({
      data: nextData, sortby: column, descending: nextDescending,
    });
  }

  showEditor(e) {
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row, 10),
        cell: e.target.cellIndex,
      },
    });
  }

  save(e) {
    e.preventDefault();
    const input = e.target.firstChild;
    const { data, edit: { row, cell } } = this.state;
    const newData = Array.from(data);
    newData[row][cell] = input.value;
    this.setState({
      edit: null,
      data: newData,
    });
  }

  renderTable() {
    const {
      data, sortby, descending, edit,
    } = this.state;
    return (
      <table>
        <thead onClick={this.sort}>
          <tr>
            {headers.map((title, index) => (
              <th key={index}>
                {title}
                {getDescending(sortby, index, descending)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody onDoubleClick={this.showEditor}>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => {
                let content = cell;
                if (edit && edit.row === rowIndex && edit.cell === cellIndex) {
                  content = (
                    <form
                      onSubmit={this.save}
                    >
                      <input
                        type="text"
                        defaultValue={cell}
                      />
                    </form>
                  );
                }
                return (
                  <td
                    key={cellIndex}
                    data-row={rowIndex}
                  >
                    {content}
                  </td>
                );
              })
            }
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    this.sss();
    return this.renderTable();

    // const {
    //   data, sortby, descending, edit,
    // } = this.state;
    // return (
    //   <table>
    //     <thead onClick={this.sort}>
    //       <tr>
    //         {headers.map((title, index) => (
    //           <th key={index}>
    //             {title}
    //             {getDescending(sortby, index, descending)}
    //           </th>
    //         ))}
    //       </tr>
    //     </thead>
    //     <tbody onDoubleClick={this.showEditor}>
    //       {data.map((row, rowIndex) => (
    //         <tr key={rowIndex}>
    //           {row.map((cell, cellIndex) => {
    //             let content = cell;
    //             if (edit && edit.row === rowIndex && edit.cell === cellIndex) {
    //               content = (
    //                 <form
    //                   onSubmit={this.save}
    //                 >
    //                   <input
    //                     type="text"
    //                     defaultValue={cell}
    //                   />
    //                 </form>
    //               );
    //             }
    //             return (
    //               <td
    //                 key={cellIndex}
    //                 data-row={rowIndex}
    //               >
    //                 {content}
    //               </td>
    //             );
    //           })
    //         }
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // );
  }
}

export default Excel;
