import logo from '../logo.svg'
import classes from './Header.module.css'

const Header = () => {
  return (
    <div className={classes.header}>
      <header className={classes['header-content']}>
        <img src={logo} className={classes['header-logo']} alt="logo" />
        <h2>GI<span>⅁</span>A CARS</h2>
      </header>
    </div>
  );
}
export default Header;