<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
    import logo from "$lib/assets/kaist_logo.png";
</script>

<div class="header-div " style="display: flex; flex-direction: column;">
    <Navbar let:hidden let:toggle color="form" navClass="px-2 sm:px-4 py-2.5 absolute w-full z-20 top-0 left-0 border-b">
        <NavBrand href="/">
            <img
            src="{logo}"
            class="mt-1 mr-2 h-4"
            alt="Logo"
            />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            GS1 DIGITAL LINK
            </span>
        </NavBrand>
        <!-- <NavHamburger on:click={toggle} />
        <NavUl {hidden}>
            <NavLi href="/" active={true}>Home</NavLi>
            <NavLi href="/about">About</NavLi>
            <NavLi href="/services">Services</NavLi>
            <NavLi href="/pricing">Pricing</NavLi>
            <NavLi href="/contact">Contact</NavLi>
        </NavUl> -->
    </Navbar>
</div>