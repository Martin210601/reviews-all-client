import classNames from 'classnames/bind';
import styles from '~/Layout/DefaultLayout/sideBar/menu/menu.module.scss'
const cx = classNames.bind(styles);

export const HomeIcon = ({ width = '3.2rem', height = '3.2rem', className = 'icon-sideBar' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cx(className)}
        width={width}
        height={height}
        fill="gray"
        fillOpacity="0.5"
        viewBox="0 0 16 16">
        <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
        <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
    </svg>
);
export const ProfileIcon = ({ width = '3.2rem', height = '3.2rem', className = 'icon-sideBar' }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        className={cx(className)}

        width={width}
        height={height}
        fill="gray"
        fillOpacity="0.5"
        viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
    </svg>
)
export const UploadIcon = ({ width = '3.2rem', height = '3.2rem', className = 'icon-sideBar' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cx(className)}

        width={width}
        height={height}
        fill="gray"
        fillOpacity="0.5"
        viewBox="0 0 16 16">
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" /> </svg>
);
export const FavoriteIcon = ({ width = '3.2rem', height = '3.2rem', className = 'icon-sideBar' }) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        className={cx(className)}
        width={width}
        height={height}
        fill="gray"
        fillOpacity="0.5"
        viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
    </svg>
);