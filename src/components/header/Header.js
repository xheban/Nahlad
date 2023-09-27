import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppSwitcher32,
    UserAvatar32,
} from '../../../node_modules/@carbon/icons-react';

import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems,
} from 'carbon-components-react';

const MainHeader = () => (
    <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="Carbon Tutorial">
                <SkipToContent />
                <HeaderMenuButton
                    aria-label="Open menu"
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                />
                <HeaderName element={Link} to="/" href="/" prefix="MH">
                    Vizualizácia dát
                </HeaderName>
                <HeaderNavigation aria-label="Carbon Tutorial">
                    <HeaderMenuItem element={Link} to="/repos" href="/repos">O projekte</HeaderMenuItem>
                </HeaderNavigation>
                <SideNav
                    aria-label="Side navigation"
                    expanded={isSideNavExpanded}
                    isPersistent={false}>
                    <SideNavItems>
                        <HeaderSideNavItems>
                            <HeaderMenuItem href="/repos">O projekte</HeaderMenuItem>
                        </HeaderSideNavItems>
                    </SideNavItems>
                </SideNav>
                <HeaderGlobalBar>
                    {/*<HeaderGlobalAction aria-label="User Avatar">*/}
                    {/*    <UserAvatar32 />*/}
                    {/*</HeaderGlobalAction>*/}
                    {/*<HeaderGlobalAction aria-label="App Switcher">*/}
                    {/*    <AppSwitcher32 />*/}
                    {/*</HeaderGlobalAction>*/}
                </HeaderGlobalBar>
            </Header>
        )}
    />
);



export default MainHeader;