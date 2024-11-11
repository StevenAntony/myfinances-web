'use client'
import './navbar.css';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';

type Props = {
    
}

export default function NavBar({ }: Props) {
    const itemRenderer = (item: any) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            url: '/my/home',
        },
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2 h-[40px]"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" className='h-[40px] w-[40px]' shape="circle" />
        </div>
    );

    return (
        <Menubar model={items} start={start} end={end} />
    );
}