const autoUpdater = require('electron-updater').autoUpdater
const Menu = require('electron').Menu

var state = 'checking'

exports.initialize = function () {
  if (process.mas) return

  autoUpdater.on('checking-for-update', function () {
    state = 'checking'
    console.log('checking-for-update')
    exports.updateMenu()
  })

  autoUpdater.on('update-available', function () {
    state = 'checking'
    console.log('update-available')
    exports.updateMenu()
  })

  autoUpdater.on('update-not-available', function () {
    state = 'no-update'
    console.log('update-not-available')
    exports.updateMenu()
  })

  autoUpdater.on('error', function () {
    state = 'no-update'
    console.error('There was a problem updating the application')
    console.error(message)
    exports.updateMenu()
  })

  autoUpdater.on('download-progress', function () {
    console.log('downloading-update')
    exports.updateMenu()
  })

  autoUpdater.on('update-downloaded', function () {
    state = 'installed'
    console.log('update-downloaded')
    exports.updateMenu()

    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }
  
    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.checkForUpdates()
}

exports.updateMenu = function () {
  if (process.mas) return

  var menu = Menu.getApplicationMenu()
  if (!menu) return

  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        switch (item.key) {
          case 'checkForUpdate':
            item.visible = state === 'no-update'
            break
          case 'checkingForUpdate':
            item.visible = state === 'checking'
            break
          case 'restartToUpdate':
            item.visible = state === 'installed'
            break
        }
      })
    }
  })
}