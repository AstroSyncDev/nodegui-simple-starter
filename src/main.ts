import {
  QMainWindow,
  QWidget,
  QLabel,
  QPushButton,
  QIcon,
  QBoxLayout,
  Direction,
  QLineEdit,
  EchoMode,
} from '@nodegui/nodegui';
import * as path from 'node:path';
import sourceMapSupport from 'source-map-support';

sourceMapSupport.install();

function main(): void {
  try {
    const win = new QMainWindow();
    win.setWindowTitle('Lohmann FMS - Login');

    const centralWidget = new QWidget();

    const rootLayout = new QBoxLayout(Direction.TopToBottom);
    centralWidget.setObjectName('myroot');
    centralWidget.setLayout(rootLayout);

    // --- Welcome label ---
    const welcomeLabel = new QLabel();
    welcomeLabel.setObjectName('welcomeLabel');
    welcomeLabel.setText('Welcome to Lohmann FMS');

    // Optional logo on top (reusing your icon)
    // const logoButton = new QPushButton();
    // logoButton.setIcon(new QIcon(path.join(__dirname, '../assets/logox200.png')));
    // logoButton.setObjectName('logoButton');

    // --- Email field ---
    const emailInput = new QLineEdit();
    emailInput.setObjectName('emailInput');
    emailInput.setPlaceholderText('Email');

    // --- Password field ---
    const passwordInput = new QLineEdit();
    passwordInput.setObjectName('passwordInput');
    passwordInput.setPlaceholderText('Password');
    passwordInput.setEchoMode(EchoMode.Password);

    // --- Login button ---
    const loginButton = new QPushButton();
    loginButton.setObjectName('loginButton');
    loginButton.setText('Login');

    loginButton.addEventListener('clicked', () => {
      try {
        const email = emailInput.text();
        const password = passwordInput.text();
        console.log('Login clicked with:', { email, password });
      } catch (err) {
        console.error('Error in login click handler:', err);
      }
    });

    // Layout
    // rootLayout.addWidget(logoButton);
    rootLayout.addWidget(welcomeLabel);
    rootLayout.addWidget(emailInput);
    rootLayout.addWidget(passwordInput);
    rootLayout.addWidget(loginButton);

    win.setCentralWidget(centralWidget);
    win.resize(400, 180);

    win.setStyleSheet(`
      #myroot {
      }

      #welcomeLabel {
        color: white;
        font-size: 18px;
        font-weight: bold;
        padding: 8px;
      }

      QLineEdit {
        padding: 6px;
        border-radius: 4px;
        margin: 4px 16px;
      }

      QPushButton#loginButton {
        padding: 6px 12px;
        margin: 12px 16px;
        font-weight: bold;
      }
    `);

    win.show();

    (global as any).win = win;
  } catch (err) {
    console.error('Error in main():', err);
  }
}

try {
  main();
} catch (err) {
  console.error('Unhandled error starting app:', err);
}
