import logo from '../../src/quiz-logo.jpg';
function Header() {
    return (
        <header className="app-header">
            <img src={logo} alt="quize logo" />
            <h1>The React Quiz</h1>
        </header>
    );
}

export default Header;
