using Redline.Core.DayZ;

namespace Redline.Tests;

public class DayZConfigTests
{
    [Fact]
    public void BuildLaunchArguments_ShouldFormatCorrectParameters()
    {
        var modFolders = new List<string>(); // none existing
        string args = DayZConfigManager.BuildLaunchArguments(
            modFolders,
            serverIp: "192.168.1.100",
            serverPort: 2302,
            serverPassword: "secretPassword",
            profileName: "RedlinePlayer",
            noSplash: true,
            skipIntro: true
        );

        Assert.Contains("-nosplash", args);
        Assert.Contains("-skipIntro", args);
        Assert.Contains("-world=empty", args);
        Assert.Contains("-connect=192.168.1.100", args);
        Assert.Contains("-port=2302", args);
        Assert.Contains("-password=\"secretPassword\"", args);
        Assert.Contains("-name=\"RedlinePlayer\"", args);
    }
}

