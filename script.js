// DOMContentLoadedイベントでスクリプトの実行を開始します
document.addEventListener('DOMContentLoaded', () => {
    // === 1. タイトルとサブタイトルのアニメーション処理 ===
    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('subTitle');
    const heroBackground = document.getElementById('heroBackground');

    // ページのタイトルとサブタイトルに奥から飛び出てくるアニメーションを適用します
    // DOM要素がレンダリングされてからクラスを適用するために、短い遅延を入れます。
    // これにより、CSSのトランジションが確実に適用され、アニメーションが発火します。
    setTimeout(() => {
        // nullチェックを強化
        if (mainTitle) {
            mainTitle.classList.add('active');
            console.log('mainTitle active class added'); // デバッグ用ログ
        } else {
            console.error('mainTitle element not found!');
        }

        if (subTitle) {
            subTitle.classList.add('active');
            console.log('subTitle active class added'); // デバッグ用ログ
        } else {
            console.error('subTitle element not found!');
        }
    }, 100); // 100ミリ秒後にアニメーション開始

    // === 2. スクロールイベントリスナー：背景のパララックス効果とシナリオテキストの表示制御 ===
    // シナリオテキストの表示を一度きりにするためのフラグ
    let scenarioAnimated = false;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY; // 現在のスクロール位置を取得

        // 背景画像のパララックス効果：スクロールに合わせて拡大・移動させます
        if (heroBackground) {
            heroBackground.style.transform = `scale(${1 + scrollY * 0.0001}) translateY(-${scrollY * 0.1}px)`;
        }

        // シナリオテキストの表示制御
        const scenarioSection = document.getElementById('scenario');

        // シナリオセクションが存在し、かつまだアニメーションが実行されていない場合のみ処理
        if (scenarioSection && !scenarioAnimated) {
            const sectionTop = scenarioSection.getBoundingClientRect().top; // ビューポート上部からの位置
            const viewportHeight = window.innerHeight; // ビューポートの高さ

            // シナリオセクションがビューポートの下部から約100pxの位置に入ったらアニメーションを開始
            // この条件は、ユーザーがセクションを見始めるタイミングで発火するように調整可能です。
            if (sectionTop < viewportHeight - 100) {
                const scenarioTextElements = [
                    document.getElementById('scenarioText1'),
                    document.getElementById('scenarioText2'),
                    document.getElementById('scenarioText3'),
                    document.getElementById('scenarioText4'),
                    document.getElementById('scenarioText5'),
                    document.getElementById('scenarioText6'),
					document.getElementById('scenarioText7')
                ];

                scenarioTextElements.forEach((el, index) => {
                    if (el) { // 要素が存在するか確認
                        // 各テキスト要素に遅延を付けてアニメーションクラスを追加します
                        // これにより、テキストが順番に左から右へ浮かび上がります
                        setTimeout(() => {
                            el.classList.remove('text-reveal-hidden'); // 初期状態のクラスを削除
                            el.classList.add('text-reveal-active');    // アクティブ状態のクラスを追加
                            console.log(`Scenario text ${index + 1} animated.`); // デバッグ用ログ
                        }, index * 900); // 300ミリ秒ずつ遅延をかけて表示
                    } else {
                        console.warn(`Scenario text element scenarioText${index + 1} not found.`); // 警告ログ
                    }
                });
                scenarioAnimated = true; // アニメーションが実行されたことを記録し、以降は実行しない
                console.log('Scenario animation triggered.'); // デバッグ用ログ
            }
        }
    });

    // === 3. アンサー入力と判定のロジック ===
const answerInput = document.getElementById('answerInput');
const submitAnswerBtn = document.getElementById('submitAnswerBtn');
const answerMessage = document.getElementById('answerMessage');

// 各要素が存在する場合のみイベントリスナーを設定します (nullチェック)
if (answerInput && submitAnswerBtn && answerMessage) {
    // アンサーボタンがクリックされた時の処理
    submitAnswerBtn.addEventListener('click', () => {
        const inputVal = answerInput.value.trim(); // 入力値を取得し、前後の空白を除去

        // 正解のリストを配列で定義
        const correctAnswers = [
            "かおりのその",
            "あおいそら",
            "ひまわり",      // ★追加
            "ハイビスカス",  // ★追加
            "オニユリ",      // ★追加
            "エノコログサ",  // ★追加
            "ソメイヨシノ"   // ★追加
        ];

        // 入力値が正解のリストに含まれているかチェック
        if (correctAnswers.includes(inputVal)) {
            answerMessage.textContent = "正解！"; // 正解メッセージを表示
            answerMessage.className = 'answer-message text-green-600 font-bold'; // CSSクラスを適用
        } else {
            // それ以外の入力の場合
            answerMessage.textContent = "不正解です。もう一度考えてみましょう。"; // 不正解メッセージを表示
            answerMessage.className = 'answer-message text-red-600 font-bold'; // CSSクラスを適用
        }
        answerInput.value = ''; // 入力フィールドをクリア
        console.log(`Answer submitted: "${inputVal}", Result: ${answerMessage.textContent}`); // デバッグ用ログ
    });

    // Enterキーでもアンサーを送信できるようにする処理
    answerInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            submitAnswerBtn.click(); // ボタンのクリックイベントをトリガー
            console.log('Enter key pressed to submit answer.'); // デバッグ用ログ
        }
    });
} else {
    console.warn('Answer section elements (input, button, message) not all found.');
}

// ... (以下略) ...

    // === 4. ヒントページへの遷移ロジック ===
    const goToHintPageBtn = document.getElementById('goToHintPageBtn');
    if (goToHintPageBtn) {
        goToHintPageBtn.addEventListener('click', () => {
            // 指定されたヒントページのURLへ遷移
            window.location.href = "https://ne23-1258d.github.io/RPGmastor/";
            console.log('Navigating to hint page.'); // デバッグ用ログ
        });
    } else {
        console.warn('Hint page button not found.');
    }
});