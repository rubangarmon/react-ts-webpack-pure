import React from 'react'
import happyCat from 'svg/happy_cat.svg'
import Message from 'components/Message/Message'

const App = () => {
    return (
        <div className="container">
            <img src={happyCat} className="App-logo" alt="logo" />
            <h1>My React TypeScript Webpack App!</h1>
            <Message />
        </div>
    )
}

export default App
