<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte'
    import logo from "$lib/assets/kaist_logo.png";
</script>

<div class="header-div">
    <Navbar let:hidden let:toggle color="form">
        <NavBrand href="/">
            <img
            src="{logo}"
            class="mt-1 mr-2 h-4"
            alt="Logo"
            />
            <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            KAIST DPP DEMO
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