import { useEffect, useRef } from 'react';

interface EmulatorProps {
    gameUrl?: string;
    biosUrl?: string;
    style?: React.CSSProperties;
    className?: string;
    coreOptions?: Record<string, string | number | boolean>;
}

const Emulator = ({ gameUrl, biosUrl, style, className, coreOptions }: EmulatorProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    useEffect(() => {
        if (!iframeRef.current) return;

        const iframeDoc = iframeRef.current.contentDocument;
        if (!iframeDoc) return;

        // Create the HTML content for the iframe
        const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }
          #game {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <div id="game"></div>
        <script>
          // Apply core options to localStorage before EmulatorJS loads
          (function() {
            const coreOptions = ${JSON.stringify(coreOptions || {})};
            const gameUrl = '${gameUrl}';
            const core = 'gb';

            if (Object.keys(coreOptions).length > 0) {
              // EmulatorJS uses localStorage key format: ejs-1-{core}-{gameUrl}-settings
              const storageKey = 'ejs-1-' + core + '-' + gameUrl + '-settings';

              console.log('[EmulatorJS] Setting core options for:', storageKey);

              // Read existing settings to preserve controlSettings if they exist
              let existingSettings = {};
              try {
                const stored = localStorage.getItem(storageKey);
                if (stored) {
                  existingSettings = JSON.parse(stored);
                  // console.log('[EmulatorJS] Existing settings:', existingSettings);
                }
              } catch (e) {
                console.warn('[EmulatorJS] Failed to read existing settings:', e);
              }

              // Merge core options into settings
              const newSettings = {
                ...(existingSettings.controlSettings ? { controlSettings: existingSettings.controlSettings } : {}),
                settings: {
                  ...(existingSettings.settings || {}),
                  ...coreOptions
                },
                ...(existingSettings.cheats ? { cheats: existingSettings.cheats } : {})
              };

              // console.log('[EmulatorJS] Writing settings:', newSettings);
              localStorage.setItem(storageKey, JSON.stringify(newSettings));
            }
          })();

          EJS_player = '#game';
          EJS_core = 'gb';
          EJS_gameUrl = '${gameUrl}';
          EJS_startOnLoaded = true;
          EJS_backgroundColor = 'rgba(0, 0, 0, 0)';
          EJS_biosUrl = '/games/bios.bin';
          EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
        </script>
        <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
      </body>
    </html>
  `;

        // Write content to iframe
        iframeDoc.open();
        iframeDoc.write(iframeContent);
        iframeDoc.close();
    }, [gameUrl, biosUrl, coreOptions]);

    if (!gameUrl) return;

    return (
        <iframe
            key={gameUrl}
            ref={iframeRef}
            style={{
                border: 'none',
                width: '100%',
                height: '100%',
                ...style,
            }}
            className={className}
            title="Game Emulator"
        />
    );
};

export default Emulator;
