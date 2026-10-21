import Cocoa
import ScreenSaver
import WebKit

/// Renders the Black Water page in a WebView and drives it as a macOS screen saver.
final class BlackWaterSaverView: ScreenSaverView {

    private var webView: WKWebView?

    override init?(frame: NSRect, isPreview: Bool) {
        super.init(frame: frame, isPreview: isPreview)
        setUp(isPreview: isPreview)
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setUp(isPreview: false)
    }

    private func setUp(isPreview: Bool) {
        wantsLayer = true
        layer?.backgroundColor = NSColor.black.cgColor

        let configuration = WKWebViewConfiguration()

        // Flags are injected before any page script runs, so screensaver.js sees them on load.
        let flags = """
        window.__BLACKWATER_SAVER__ = true;
        window.__BLACKWATER_PREVIEW__ = \(isPreview ? "true" : "false");
        """
        configuration.userContentController.addUserScript(
            WKUserScript(source: flags, injectionTime: .atDocumentStart, forMainFrameOnly: true)
        )

        let view = WKWebView(frame: bounds, configuration: configuration)
        view.autoresizingMask = [.width, .height]
        addSubview(view)
        webView = view

        guard let resources = Bundle(for: BlackWaterSaverView.self).resourceURL else { return }
        view.loadFileURL(resources.appendingPathComponent("index.html"),
                         allowingReadAccessTo: resources)
    }

    override func startAnimation() {
        super.startAnimation()
        webView?.evaluateJavaScript("window.__BLACKWATER_RESUME__ && window.__BLACKWATER_RESUME__()")
    }

    override func stopAnimation() {
        super.stopAnimation()
        webView?.evaluateJavaScript("window.__BLACKWATER_SUSPEND__ && window.__BLACKWATER_SUSPEND__()")
    }

    /// The page animates itself with requestAnimationFrame.
    override func animateOneFrame() {}

    override var hasConfigureSheet: Bool { false }
    override var configureSheet: NSWindow? { nil }
}
