export interface Banner {
    id?: string,
    banner: string,
    title: string,
    content: string,
    buttonTitle: string,
    buttonUrl: string,
    status?: string,
    client?: string
}

export interface CourseSlider {
    id?: string,
    courseType: string,
    courseTitle: string,
    content: string,
    courseImage: string,
    buttonTitle: string,
    status?: string,
    client?: string
}

export interface GlobalSetting {
    userId?: string,
    inAppNotification?: boolean,
    SMSNotification?: boolean,
    EmailNotification?: boolean,
    trainerCertificationAccess?: boolean
}

export interface MaturityLevel {
    id?: string,
    maturityLevelName?: string,
    rangeStart?: number,
    rangeEnd?: number,
    color?: string
}

export interface Theme {
    id?: string,
    primaryColor?: string;
    secondaryColor?: string;
    buttonColor?: string;
    textColor?: string;
    fontFamily?: string;
    logo?: string;
    themeFor?: string;
}

export interface ResetPasswordType {
    token: string,
    oldPassword: string;
    password: string;
    confirmPassword: string;
}