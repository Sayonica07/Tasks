describe('Login Page', () => {
    beforeEach(async () => {
        await browser.reloadSession();
        await browser.url('https://demo.haroldwaste.com/');
    });

    it('TC01 Verify login with valid credentials', async () => {
        const email = await $('//input[@name="email"]');
        const password = await $("//input[@name='password']");
        const loginButton = await $("//button[@type='submit']");

        await email.setValue('qa@julesai.com');
        await password.setValue('QaJULES2023!');
        await loginButton.click();
        await expect(browser).toHaveUrlContaining('purchases');
    });

    it('TC02 Verify login functionality with invalid credentials', async () => {
        const email = await $('//input[@name="email"]');
        const password = await $("//input[@name='password']");
        const loginButton = await $("//button[@type='submit']");
        const errorMsg = await $("//div[text()='Your email and/or password are incorrects']");

        await email.setValue('sayonica@gmail.com');
        await password.setValue('sayonica@07');
        await loginButton.click();

        await expect(errorMsg).toBeDisplayed();
        await expect(errorMsg).toHaveTextContaining('Your email and/or password are incorrects');
    });

    it('TC03 Verify it should show an error when email is missing', async () => {
        const password = await $("//input[@name='password']");
        const loginButton = await $("//button[@type='submit']");
        const errorMsg = await $("//div[text()='Required']");

        await password.setValue('validPassword');
        await loginButton.click();

        await expect(errorMsg).toBeDisplayed();
        await expect(errorMsg).toHaveTextContaining('Required');
    });
});
