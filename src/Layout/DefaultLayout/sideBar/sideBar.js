import classNames from 'classnames/bind';
import styles from './sideBar.module.scss';
import { HomeIcon, ProfileIcon, UploadIcon, FavoriteIcon } from '~/Components/icon';
import Menu from './menu/index';
import { MenuItem } from './menu/index'
const cx = classNames.bind(styles)
function SideBar() {
    return (<aside className={cx('sideBar')}>
        <Menu>
            <MenuItem title="ALL Blog" to='/' icon={<HomeIcon />} />
            <MenuItem title="My Blog" to='/myBlogs' icon={<ProfileIcon />} />
            <MenuItem title="UpLoad" to='/create' icon={<UploadIcon />} />
            <MenuItem title="Favorite" to='/favorite' icon={<FavoriteIcon />} />
        </Menu>
    </aside>);
}

export default SideBar;