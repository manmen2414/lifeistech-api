declare const _exports: {
    getCharactorsImage: typeof import("./util").getCharactorsImage;
    checkIsLITPage: typeof import("./util").checkIsLITPage;
    checkCookieToken: typeof import("./util").checkCookieToken;
    API_URL: "https://api.lifeistech-lesson.jp/api/players";
    API_CH5_URL: string;
    DeferedArray: typeof import("./util").DeferedArray;
    tryJSONParse: typeof import("./util").tryJSONParse;
    checkAuthParseJSON: typeof import("./util").checkAuthParseJSON;
    CharactorAvatarsEnum: import("lizod").Validator<"hero1_conv" | "hero2_conv" | "hero3_conv" | "heroine1_conv" | "heroine2_conv" | "heroine3_conv">;
    UserBase: typeof import("./user").UserBase;
    User: typeof import("./user").User;
    USER_API_SCHEMA: (input: any, ctx?: {
        errors: Array<(string | number | symbol)[]>;
    }, path?: (string | number | symbol)[]) => input is { [K in "id" | "language" | "log_level" | "header_user_icon_name" | "login_status" | "my_page_url" | "custom_items" | "setting_menu_items" | "logo_url" | "player_name" | "nickname" | "chatroom_nickname" | "avatarFileName" | "headerUserIconName" | "header_appearance" | "soundConfig" | "soundVolume" | "schoolId" | "defaultPassword" | "disabledLogin" | "demoAccount" | "lessonGroups" | "currentSchoolKind" | "lessonAvailable" | "drillAvailable" | "examAvailable" | "accountAvailable" | "ide_url"]: import("lizod").Infer<{
        language: import("lizod").Validator<string>;
        log_level: import("lizod").Validator<string>;
        header_user_icon_name: import("lizod").Validator<string>;
        login_status: import("lizod").Validator<string>;
        my_page_url: import("lizod").Validator<string>;
        custom_items: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is {
            url: string;
            text: string;
            style: {
                border: string;
                padding: string;
                borderRadius: string;
            };
        }[];
        setting_menu_items: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is {
            url: string;
            text: string;
        }[];
        logo_url: import("lizod").Validator<string>;
        player_name: import("lizod").Validator<string>;
        nickname: import("lizod").Validator<string>;
        chatroom_nickname: import("lizod").Validator<string | null>;
        avatarFileName: import("lizod").Validator<"hero1_conv" | "hero2_conv" | "hero3_conv" | "heroine1_conv" | "heroine2_conv" | "heroine3_conv">;
        headerUserIconName: import("lizod").Validator<string>;
        header_appearance: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is { [K in "show_user_icon" | "show_menu" | "show_login_status"]: import("lizod").Infer<{
            show_user_icon: import("lizod").Validator<boolean>;
            show_menu: import("lizod").Validator<boolean>;
            show_login_status: import("lizod").Validator<boolean>;
        }[K]>; };
        soundConfig: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is { [K in "min" | "max"]: import("lizod").Infer<{
            min: import("lizod").Validator<number>;
            max: import("lizod").Validator<number>;
        }[K]>; };
        soundVolume: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is { [K in "bgm" | "se"]: import("lizod").Infer<{
            bgm: import("lizod").Validator<number>;
            se: import("lizod").Validator<number>;
        }[K]>; };
        id: import("lizod").Validator<number>;
        schoolId: import("lizod").Validator<number>;
        defaultPassword: import("lizod").Validator<boolean>;
        disabledLogin: import("lizod").Validator<boolean>;
        demoAccount: import("lizod").Validator<boolean>;
        lessonGroups: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is {
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
            school_id: number;
            year: number;
            lesson_pattern_id: number;
            grade: number;
            lesson_course_id: number;
            drill_available: boolean;
            exam_available: boolean;
            textbook_id: void;
        }[];
        currentSchoolKind: import("lizod").Validator<string>;
        lessonAvailable: import("lizod").Validator<boolean>;
        drillAvailable: import("lizod").Validator<boolean>;
        examAvailable: import("lizod").Validator<boolean>;
        accountAvailable: import("lizod").Validator<boolean>;
        ide_url: import("lizod").Validator<string>;
    }[K]>; };
    PageFile: typeof import("./pageComponents").PageFile;
    PageImage: typeof import("./pageComponents").PageImage;
    PageDataTable: typeof import("./pageComponents").PageDataTable;
    PAGEFILE_API_SCHEMA: (input: any, ctx?: {
        errors: Array<(string | number | symbol)[]>;
    }, path?: (string | number | symbol)[]) => input is { [K in "id" | "name" | "content_type" | "content" | "preview_url"]: import("lizod").Infer<{
        id: import("lizod").Validator<number>;
        name: import("lizod").Validator<string>;
        content_type: import("lizod").Validator<string>;
        content: import("lizod").Validator<string>;
        preview_url: import("lizod").Validator<string>;
    }[K]>; };
    PAGEIMAGE_API_SCHEMA: (input: any, ctx?: {
        errors: Array<(string | number | symbol)[]>;
    }, path?: (string | number | symbol)[]) => input is { [K in "id" | "name" | "url" | "thumbnail_url"]: import("lizod").Infer<{
        id: import("lizod").Validator<number>;
        name: import("lizod").Validator<string>;
        url: import("lizod").Validator<string>;
        thumbnail_url: import("lizod").Validator<string | null>;
    }[K]>; };
    PAGEDATATABLE_API_SCHEMA: (input: any, ctx?: {
        errors: Array<(string | number | symbol)[]>;
    }, path?: (string | number | symbol)[]) => input is {
        id: number;
        label: string;
        value: void[];
        default_header: string[];
        header: string[];
        value_editable: boolean;
        min_data_count: number;
    };
    PageBase: typeof import("./page").PageBase;
    Page: typeof import("./page").Page;
    PAGE_API_SCHEMA: (input: any, ctx?: {
        errors: Array<(string | number | symbol)[]>;
    }, path?: (string | number | symbol)[]) => input is { [K in "id" | "preview_url" | "player_id" | "title" | "is_read" | "data_tables" | "files" | "images" | "preset_images"]: import("lizod").Infer<{
        id: import("lizod").Validator<number>;
        player_id: import("lizod").Validator<number>;
        title: import("lizod").Validator<string>;
        preview_url: import("lizod").Validator<string>;
        is_read: import("lizod").Validator<boolean>;
        data_tables: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is {
            id: number;
            label: string;
            value: void[];
            default_header: string[];
            header: string[];
            value_editable: boolean;
            min_data_count: number;
        }[];
        files: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is {
            id: number;
            name: string;
            content_type: string;
            content: string;
            preview_url: string;
        }[];
        images: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is {
            id: number;
            name: string;
            url: string;
            thumbnail_url: string | null;
        }[];
        preset_images: (input: any, ctx?: {
            errors: Array<(string | number | symbol)[]>;
        }, path?: (string | number | symbol)[]) => input is {
            id: number;
            name: string;
            url: string;
            thumbnail_url: string | null;
        }[];
    }[K]>; };
    Material: typeof import("./material").Material;
    LessonGroup: typeof import("./lessongroup").LessonGroup;
    Classroom: typeof import("./lessongroup").Classroom;
    Lesson: typeof import("./lesson").Lesson;
    LessonBase: typeof import("./lesson").LessonBase;
    AccountNotAvailableError: typeof import("./errors").AccountNotAvailableError;
    UnexpectedResponseError: typeof import("./errors").UnexpectedResponseError;
    Course: typeof import("./course").Course;
    CheckWorkAnswerer: typeof import("./checkWorkAnswerer").CheckWorkAnswerer;
    CheckWorkQuestion: typeof import("./checkWorkAnswerer").CheckWorkQuestion;
    CheckWorkResult: typeof import("./checkWorkResult").CheckWorkResult;
    CheckWork: typeof import("./checkWork").CheckWork;
    ChapterBase: typeof import("./chapter").ChapterBase;
    Chapter: typeof import("./chapter").Chapter;
};
export = _exports;
