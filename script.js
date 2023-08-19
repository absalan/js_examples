// https://github.com/rootVIII/searchable_bootstrap_table

// noinspection JSValidateTypes
class SearchableTable {
    constructor(tableData) {
        this.tableData = tableData;
        this.tableBody = document.getElementById('tableBody');
        this.searchBox = document.getElementById('searchBox');
        document.addEventListener('keyup', this.updateTable.bind(this), false);
    }

    loadTableData(searchText = null) {
        return new Promise((resolve) => {
            let tableRows = '';
            for (let row of this.tableData) {
                if (!(searchText) || row.join(' ').includes(searchText)) {
                    let [episode, season, title, airDate, loneGunmen] = row;
                    tableRows += `<tr class="d-flex">
                        <th class="col-1">${episode}</th>
                        <td class="col-1">${season}</td>
                        <td class="col-5"><a href="./json/${title}" target="_blank">${title}</a></td>
                        <td class="col-3">${airDate}</td>
                        <td class="col-2">${loneGunmen}</td></tr>`;
                }
            }
            resolve(tableRows);
        });
    }

    init_table() {
        this.loadTableData().then((tableRows) => {
            this.tableBody.innerHTML = tableRows;
        }).catch((err) => {
            console.log(err);
        });
    }

    updateTable() {
        const inputText = this.searchBox.value.trim();
        if (!(inputText.length)) {
            this.init_table();
        } else {
            this.loadTableData(inputText).then((tableRows) => {
                this.tableBody.innerHTML = tableRows;
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}

function getTableData() {
    // simulate fetching table data from the back-end:
    return [
        ['1', '1.0.0', 'globe-points.json', 'Aug 18, 2023', 'N/A'],
        ['2', '1.0.0', 'globe_points_b.json', 'Aug 18, 2023', 'N/A'],
        ['3', 's1', 'Squeeze', 'September 24, 1993', 'no'],
        ['4', 's1', 'Conduit', 'October 1, 1993', 'no'],
        ['5', 's1', 'The Jersey Devil', 'October 8, 1993', 'no'],
        ['6', 's1', 'Shadows', 'October 22, 1993', 'no'],
        ['7', 's1', 'Ghost in the Machine', 'October 29, 1993', 'no'],
        ['8', 's1', 'Ice', 'November 5, 1993', 'no'],
        ['9', 's1', 'Space', 'November 12, 1993', 'no'],
        ['10', 's1', 'Fallen Angel', 'November 19, 1993', 'no'],
        ['11', 's1', 'Eve', 'December 10, 1993', 'no'],
        ['12', 's1', 'Fire', 'December 17, 1993', 'no'],
        ['13', 's1', 'Beyond the Sea', 'January 7, 1994', 'no'],
        ['14', 's1', 'Gender Bender', 'January 21, 1994', 'no'],
        ['15', 's1', 'Lazarus', 'February 4, 1994', 'no'],
        ['16', 's1', 'Young at Heart', 'February 11, 1994', 'no'],
        ['17', 's1', 'E.B.E.', 'February 18, 1994', 'yes'],
    ];
}

function main() {
    let searchableTable;

    document.addEventListener('DOMContentLoaded', () => {
        searchableTable = new SearchableTable(getTableData());
        searchableTable.init_table();
    });
}

main();