const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

// This event checks if the app is installable
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// This event checks if the app is installed, and prompts the user to install it if not
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    if (result.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', result);
    } else {
        console.log('User dismissed the A2HS prompt', result);
    }
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// This event activates if the app has completed installation
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
