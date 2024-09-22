plugins {
    id("com.android.application")
}

android {
    namespace = "edu.stevens.cs522.chatserver"
    compileSdk = 34

    defaultConfig {
        applicationId = "edu.stevens.cs522.chatserver"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }

    // Hack to get around overlapping dependencies added by Kotlin libraries
    configurations.implementation {
        exclude ("org.jetbrains.kotlin", "kotlin-stdlib-jdk8")
    }
}

dependencies {

    implementation(libs.androidx.loader)
    implementation(libs.androidx.fragment)
    implementation(files("libs/cs522-library.aar"))
    implementation(libs.guava)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}