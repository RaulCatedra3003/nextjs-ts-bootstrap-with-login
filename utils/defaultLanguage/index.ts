const en: Languaje = {
  cntr: 'en',
  schema: {
    header: {
      home: 'Home',
      logout: 'Logout',
      login: 'Login',
      profile: 'Profile'
    },
    errors: {
      passDoesNotMatch: 'passwords doesn\'t match',
      passDoesNotPattern: 'The password must contain 1 capital 1 leter 1 simbol 1 number, min 7 and max 30 characters'
    },
    'changepassword/token': {
      changePassword: 'Change Password'
    },
    user: {
      signinLink: 'Sign In',
      sigin: 'You don\'t have account, Sigin',
      email: 'Insert your email',
      password: 'Insert your password',
      repeatPassword: 'Repeat your password',
      sendMail: 'Send mail',
      login: 'Login',
      forgotPassword: 'Forgot your password?',
      goBack: 'Go back',
      name: 'Insert your name',
      surname: 'Insert your surname',
      update: 'Update user',
      loginlink: 'You have account, Log In',
      dashboard: 'Dashboad'
    },
    profile: {
      title: 'Mail validated correctly!',
      edit: 'Edit profile'
    }
  }
}

export interface Languaje {
  cntr: string;
  schema: {
    header: {
      home: string;
      logout: string;
      login: string;
      profile: string;
    };
    errors: {
      passDoesNotMatch: string;
      passDoesNotPattern: string;
    };
    'changepassword/token': {
      changePassword: string
    };
    user: {
      signinLink: string;
      sigin: string;
      email: string;
      password: string;
      repeatPassword: string;
      sendMail: string;
      login: string;
      forgotPassword: string;
      goBack: string;
      name: string;
      surname: string;
      update: string;
      loginlink: string;
      dashboard: string;
    },
    profile: {
      title: string;
      edit: string;
    }
  }
}

export default en