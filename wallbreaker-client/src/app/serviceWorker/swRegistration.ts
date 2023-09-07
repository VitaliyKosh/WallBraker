import { Workbox } from 'workbox-window'

export default function registerServiceWorker() {
    const confirmText = 'Доступна новая версия приложения. Нажмите "Ок" чтобы обновить'

    if ('serviceWorker' in navigator) {
        const wb = new Workbox('http://localhost:3010/sw.js')

        wb.addEventListener('installed', event => {
            if (event.isUpdate) {
                if (confirm(confirmText)) {
                    window.location.reload()
                }
            }
        })

        wb.register()
    }
}
