using Redline.Core.DayZ;
using Redline.Core.Models;

namespace Redline.Tests;

public class ModParserTests
{
    [Fact]
    public void AnalyzeAndSortMods_ShouldAutoAddCFIfMissingAndModsRequireIt()
    {
        var installedCf = new DayZMod
        {
            WorkshopId = "1559212036",
            Name = "Community Framework",
            FolderPath = @"C:\Fake\1559212036"
        };

        var otherMod = new DayZMod
        {
            WorkshopId = "9999999999",
            Name = "Custom Weapon Pack",
            FolderPath = @"C:\Fake\9999999999"
        };

        var allInstalled = new List<DayZMod> { installedCf, otherMod };
        var selected = new List<DayZMod> { otherMod }; // Selected without CF

        var report = ModParser.AnalyzeAndSortMods(selected, allInstalled);

        // Should automatically inject CF at the very top of load order
        Assert.Contains(report.Warnings, w => w.Contains("Community Framework"));
        Assert.Equal("1559212036", report.SortedModLoadOrder[0].WorkshopId);
    }

    [Fact]
    public void AnalyzeAndSortMods_ShouldPlaceFrameworksFirst()
    {
        var cf = new DayZMod { WorkshopId = "1559212036", Name = "CF" };
        var dabs = new DayZMod { WorkshopId = "2545327648", Name = "Dabs Framework" };
        var expansion = new DayZMod { WorkshopId = "2116157322", Name = "DayZ-Expansion-Core" };
        var custom = new DayZMod { WorkshopId = "1234567890", Name = "Zombies Plus" };

        // Shuffled order
        var selected = new List<DayZMod> { custom, expansion, dabs, cf };
        var all = new List<DayZMod> { custom, expansion, dabs, cf };

        var report = ModParser.AnalyzeAndSortMods(selected, all);

        // Load order priority: CF (1) -> Dabs (2) -> Expansion (3) -> Custom
        Assert.Equal("1559212036", report.SortedModLoadOrder[0].WorkshopId);
        Assert.Equal("2545327648", report.SortedModLoadOrder[1].WorkshopId);
        Assert.Equal("2116157322", report.SortedModLoadOrder[2].WorkshopId);
        Assert.Equal("1234567890", report.SortedModLoadOrder[3].WorkshopId);
    }
}

