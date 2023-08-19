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