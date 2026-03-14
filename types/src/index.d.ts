declare const _exports: {
    getCharactorsImage: typeof import("./util").getCharactorsImage;
    checkIsLITPage: typeof import("./util").checkIsLITPage;
    checkCookieToken: typeof import("./util").checkCookieToken;
    API_URL: "https://api.lifeistech-lesson.jp/api/players";
    API_CH5_URL: string;
    DeferedArray: typeof import("./util").DeferedArray;
    tryJSONParse: typeof import("./util").tryJSONParse;
    checkAuthParseJSON: typeof import("./util").checkAuthParseJSON;
    CharactorAvatarsEnum: import("zod").ZodEnum<{
        hero1_conv: "hero1_conv";
        hero2_conv: "hero2_conv";
        hero3_conv: "hero3_conv";
        heroine1_conv: "heroine1_conv";
        heroine2_conv: "heroine2_conv";
        heroine3_conv: "heroine3_conv";
    }>;
    UserBase: typeof import("./user").UserBase;
    User: typeof import("./user").User;
    USER_API_SCHEMA: import("zod").ZodObject<{
        language: import("zod").ZodString;
        log_level: import("zod").ZodString;
        header_user_icon_name: import("zod").ZodString;
        login_status: import("zod").ZodString;
        my_page_url: import("zod").ZodString;
        custom_items: import("zod").ZodArray<import("zod").ZodObject<{
            url: import("zod").ZodString;
            text: import("zod").ZodString;
            style: import("zod").ZodObject<{
                border: import("zod").ZodString;
                padding: import("zod").ZodString;
                borderRadius: import("zod").ZodString;
            }, import("zod/v4/core").$strip>;
        }, import("zod/v4/core").$strip>>;
        setting_menu_items: import("zod").ZodArray<import("zod").ZodObject<{
            url: import("zod").ZodString;
            text: import("zod").ZodString;
        }, import("zod/v4/core").$strip>>;
        logo_url: import("zod").ZodString;
        player_name: import("zod").ZodString;
        nickname: import("zod").ZodString;
        chatroom_nickname: import("zod").ZodAny;
        avatarFileName: import("zod").ZodEnum<{
            hero1_conv: "hero1_conv";
            hero2_conv: "hero2_conv";
            hero3_conv: "hero3_conv";
            heroine1_conv: "heroine1_conv";
            heroine2_conv: "heroine2_conv";
            heroine3_conv: "heroine3_conv";
        }>;
        headerUserIconName: import("zod").ZodString;
        header_appearance: import("zod").ZodObject<{
            show_user_icon: import("zod").ZodBoolean;
            show_menu: import("zod").ZodBoolean;
            show_login_status: import("zod").ZodBoolean;
        }, import("zod/v4/core").$strip>;
        soundConfig: import("zod").ZodObject<{
            min: import("zod").ZodNumber;
            max: import("zod").ZodNumber;
        }, import("zod/v4/core").$strip>;
        soundVolume: import("zod").ZodObject<{
            bgm: import("zod").ZodNumber;
            se: import("zod").ZodNumber;
        }, import("zod/v4/core").$strip>;
        id: import("zod").ZodNumber;
        schoolId: import("zod").ZodNumber;
        defaultPassword: import("zod").ZodBoolean;
        disabledLogin: import("zod").ZodBoolean;
        demoAccount: import("zod").ZodBoolean;
        lessonGroups: import("zod").ZodArray<import("zod").ZodObject<{
            id: import("zod").ZodNumber;
            name: import("zod").ZodString;
            created_at: import("zod").ZodString;
            updated_at: import("zod").ZodString;
            school_id: import("zod").ZodNumber;
            year: import("zod").ZodNumber;
            lesson_pattern_id: import("zod").ZodNumber;
            grade: import("zod").ZodNumber;
            lesson_course_id: import("zod").ZodNumber;
            drill_available: import("zod").ZodBoolean;
            exam_available: import("zod").ZodBoolean;
            textbook_id: import("zod").ZodAny;
        }, import("zod/v4/core").$strip>>;
        currentSchoolKind: import("zod").ZodString;
        lessonAvailable: import("zod").ZodBoolean;
        drillAvailable: import("zod").ZodBoolean;
        examAvailable: import("zod").ZodBoolean;
        accountAvailable: import("zod").ZodBoolean;
        ide_url: import("zod").ZodString;
    }, import("zod/v4/core").$strip>;
    PageFile: typeof import("./pageComponents").PageFile;
    PageImage: typeof import("./pageComponents").PageImage;
    PageDataTable: typeof import("./pageComponents").PageDataTable;
    PAGEFILE_API_SCHEMA: import("zod").ZodArray<import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        name: import("zod").ZodString;
        content_type: import("zod").ZodString;
        content: import("zod").ZodString;
        preview_url: import("zod").ZodString;
    }, import("zod/v4/core").$strip>>;
    PAGEIMAGE_API_SCHEMA: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        name: import("zod").ZodString;
        url: import("zod").ZodString;
        thumbnail_url: import("zod").ZodOptional<import("zod").ZodString>;
    }, import("zod/v4/core").$strip>;
    PAGEDATATABLE_API_SCHEMA: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        label: import("zod").ZodString;
        value: import("zod").ZodArray<import("zod").ZodAny>;
        default_header: import("zod").ZodArray<import("zod").ZodString>;
        header: import("zod").ZodArray<import("zod").ZodString>;
        value_editable: import("zod").ZodBoolean;
        min_data_count: import("zod").ZodNumber;
    }, import("zod/v4/core").$strip>;
    PageBase: typeof import("./page").PageBase;
    Page: typeof import("./page").Page;
    PAGE_API_SCHEMA: import("zod").ZodObject<{
        id: import("zod").ZodNumber;
        player_id: import("zod").ZodNumber;
        title: import("zod").ZodString;
        preview_url: import("zod").ZodString;
        is_read: import("zod").ZodBoolean;
        data_tables: import("zod").ZodArray<import("zod").ZodObject<{
            id: import("zod").ZodNumber;
            label: import("zod").ZodString;
            value: import("zod").ZodArray<import("zod").ZodAny>;
            default_header: import("zod").ZodArray<import("zod").ZodString>;
            header: import("zod").ZodArray<import("zod").ZodString>;
            value_editable: import("zod").ZodBoolean;
            min_data_count: import("zod").ZodNumber;
        }, import("zod/v4/core").$strip>>;
        files: import("zod").ZodArray<import("zod").ZodArray<import("zod").ZodObject<{
            id: import("zod").ZodNumber;
            name: import("zod").ZodString;
            content_type: import("zod").ZodString;
            content: import("zod").ZodString;
            preview_url: import("zod").ZodString;
        }, import("zod/v4/core").$strip>>>;
        images: import("zod").ZodArray<import("zod").ZodObject<{
            id: import("zod").ZodNumber;
            name: import("zod").ZodString;
            url: import("zod").ZodString;
            thumbnail_url: import("zod").ZodOptional<import("zod").ZodString>;
        }, import("zod/v4/core").$strip>>;
        preset_images: import("zod").ZodArray<import("zod").ZodObject<{
            id: import("zod").ZodNumber;
            name: import("zod").ZodString;
            url: import("zod").ZodString;
            thumbnail_url: import("zod").ZodOptional<import("zod").ZodString>;
        }, import("zod/v4/core").$strip>>;
    }, import("zod/v4/core").$strip>;
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
