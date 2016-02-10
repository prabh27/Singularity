Utils = require '../../utils'

TimeStamp = require '../common/TimeStamp'
TaskStateLabel = require '../common/TaskStateLabel'
Link = require '../common/Link'

Table = React.createClass

    renderTableHeader: ->
        header = []
        key = 0
        for columnName in @props.columnNames
            header.push(<th key={key}>{columnName}</th>)
            key++
        return header

    renderElement: (element) ->
        if element.component == 'link'
            <Link
                text={element.text}
                url={element.url}
                altText={element.altText}
            />
        else if element.component == 'taskStateLabel'
            <TaskStateLabel
                taskState={element.taskState}
            />
        else if element.component == 'timestamp'
            <TimeStamp
                timestamp=element.timestamp 
                display=element.display
            />

    renderTableRow: (elements) ->
        data = []
        key = 0
        for element in elements
            data.push(<td key={key}>{@renderElement element}</td>)
            key++
        return data

    # Note: The data in @props.tableRows should be the JSX you would like to render
    renderTableData: ->
        tableRows = []
        key = 0
        for tableRow in @props.tableRows
            tableRows.push(<tr key={key}>{@renderTableRow tableRow}</tr>)
            key++
        return tableRows


    # Note: Use @props.tableClassOpts to declare things like striped or bordered
    getClassName: ->
        return "table " + @props.tableClassOpts

    render: ->
        <table className={@getClassName()}>
            <thead>
                <tr>
                    {@renderTableHeader()}
                </tr>
            </thead>
            <tbody>
                {@renderTableData()}
            </tbody>
        </table>

module.exports = Table