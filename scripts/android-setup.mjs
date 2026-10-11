// Adapte le projet Android généré par Capacitor à TNT44 :
// permissions micro, écran toujours allumé, icônes, écran de démarrage sombre, numéro de version.
import fs from 'node:fs';

const ID = 'com.tounitek.tnt44';
const MAIN = 'android/app/src/main';

// 1. Permissions : micro (sampling) et écriture des exports sur les anciens Android.
const manifestPath = `${MAIN}/AndroidManifest.xml`;
let manifest = fs.readFileSync(manifestPath, 'utf8');
const wanted = [
  ['RECORD_AUDIO', ''],
  ['MODIFY_AUDIO_SETTINGS', ''],
  ['WRITE_EXTERNAL_STORAGE', ' android:maxSdkVersion="29"'],
];
const lines = wanted
  .filter(([p]) => !manifest.includes(`android.permission.${p}"`))
  .map(([p, extra]) => `    <uses-permission android:name="android.permission.${p}"${extra} />`);
if (lines.length) manifest = manifest.replace('</manifest>', `${lines.join('\n')}\n</manifest>`);
fs.writeFileSync(manifestPath, manifest);

// 2. Activité principale : garde l'écran allumé pendant un live.
const javaDir = `${MAIN}/java/${ID.replace(/\./g, '/')}`;
fs.mkdirSync(javaDir, { recursive: true });
fs.writeFileSync(`${javaDir}/MainActivity.java`, `package ${ID};

import android.os.Bundle;
import android.view.WindowManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }
}
`);

// 3. Icônes TNT44 et couleur de fond.
fs.cpSync('resources/res', `${MAIN}/res`, { recursive: true });

// 4. Écran de démarrage : fond sombre uni à la place du logo par défaut.
const stylesPath = `${MAIN}/res/values/styles.xml`;
fs.writeFileSync(stylesPath, fs.readFileSync(stylesPath, 'utf8').replace('@drawable/splash', '@color/ic_launcher_background'));

// 5. Numéro de version : augmente à chaque compilation automatique.
const run = parseInt(process.env.GITHUB_RUN_NUMBER || '1', 10);
const gradlePath = 'android/app/build.gradle';
fs.writeFileSync(gradlePath, fs.readFileSync(gradlePath, 'utf8')
  .replace(/versionCode \d+/, `versionCode ${run}`)
  .replace(/versionName "[^"]*"/, `versionName "1.0.${run}"`));

console.log(`TNT44 : projet Android prêt (version 1.0.${run}).`);
