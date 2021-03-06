import React from 'react';
import { MenuItemNormal,MenuItemSelected, MenuItemRightFloat } from './style';
import MenuItem from './MenuItem'
export default function FlatMenu({items, selectNotebook, selectedNotebook, icon}) {
  let style = {}
  return (
    <>
      { items && items.map(item => {
        const MenuItemComponent = (selectedNotebook === item._id) ? MenuItemSelected : MenuItemNormal


        return <MenuItemComponent onClick={e=>selectNotebook(item._id)} key={item._id}>
          <MenuItem label={item.title} icon={icon} key={item._id} right={<MenuItemRightFloat>{item.children.length}</MenuItemRightFloat>} ></MenuItem>
          </MenuItemComponent>
      }
      )}
</>

  );
}
