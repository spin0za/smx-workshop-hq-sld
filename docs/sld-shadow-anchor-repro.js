var File = Java.type("java.io.File");
var Configuration = Java.type("com.imwg.smxworkshop.model.Configuration");
var Palette = Java.type("com.imwg.smxworkshop.sprite.Palette");
var SMXSprite = Java.type("com.imwg.smxworkshop.sprite.SMXSprite");
var Sprite = Java.type("com.imwg.smxworkshop.sprite.Sprite");
var SpriteIO = Java.type("com.imwg.smxworkshop.sprite.SpriteIO");

Configuration.loadConfig();
Palette.loadPalettes();

var outputPath = String(arguments[0]);
var sprite = new SMXSprite();
sprite.setPlayerMode(Sprite.PLAYER_PALETTE_DE);

for (var frameIndex = 0; frameIndex < 2; ++frameIndex) {
    var frame = sprite.createFrame();
    frame.create(Sprite.DATA_IMAGE, 8, 8);
    frame.setAnchor(Sprite.DATA_IMAGE, 4, 4);
    frame.expand(Sprite.DATA_SHADOW, 4, 4, 4, 4);
    frame.setAnchor(Sprite.DATA_SHADOW, frameIndex === 0 ? 4 : 5, 4);
    for (var y = 0; y < 8; ++y) {
        for (var x = 0; x < 8; ++x) {
            frame.setPixel(Sprite.DATA_IMAGE, x, y, Sprite.PIXEL_NULL);
            if (x >= 2 && x <= 5 && y >= 2 && y <= 5) {
                frame.setPixel(Sprite.DATA_SHADOW, x, y, 64);
            }
        }
    }
    sprite.insertFrame(frameIndex, frame);
}

SpriteIO.saveSLDSprite(sprite, outputPath);
var reloaded = SpriteIO.loadFromFile(new File(outputPath));
var f0 = reloaded.getFrame(0);
var f1 = reloaded.getFrame(1);
var differences = 0;
for (var yy = 0; yy < 8; ++yy) {
    for (var xx = 0; xx < 8; ++xx) {
        if (f0.getPixel(Sprite.DATA_SHADOW, xx, yy) !== f1.getPixel(Sprite.DATA_SHADOW, xx, yy)) {
            ++differences;
        }
    }
}

print("frame0_shadow_anchor=" + f0.getAnchorX(Sprite.DATA_SHADOW) + "," + f0.getAnchorY(Sprite.DATA_SHADOW));
print("frame1_shadow_anchor=" + f1.getAnchorX(Sprite.DATA_SHADOW) + "," + f1.getAnchorY(Sprite.DATA_SHADOW));
print("same_local_shadow_pixels_after_roundtrip=" + (differences === 0));
print("shadow_pixel_differences=" + differences);
