using Redline.Core.Security;

namespace Redline.Tests;

public class CryptoHelperTests
{
    [Fact]
    public void GenerateLicenseKey_ShouldFollowRedlineFormat()
    {
        var (plainKey, prefix, hash) = CryptoHelper.GenerateLicenseKey();

        Assert.NotNull(plainKey);
        Assert.StartsWith("RDLN-", plainKey);
        Assert.Equal(24, plainKey.Length); // RDLN-XXXX-XXXX-XXXX-XXXX
        Assert.StartsWith("RDLN-", prefix);
        Assert.Equal(9, prefix.Length); // RDLN-XXXX
        Assert.Equal(64, hash.Length); // SHA-256 hex string
    }

    [Fact]
    public void GenerateLicenseKey_ShouldGenerateUniqueKeysWithHighEntropy()
    {
        var keys = new HashSet<string>();
        for (int i = 0; i < 500; i++)
        {
            var (plainKey, _, _) = CryptoHelper.GenerateLicenseKey();
            Assert.DoesNotContain(plainKey, keys);
            keys.Add(plainKey);
        }
    }

    [Fact]
    public void ComputeSha256_ShouldProduceConsistentLowercaseHex()
    {
        string input = "RDLN-ABCD-1234-EFGH-5678";
        string hash1 = CryptoHelper.ComputeSha256(input);
        string hash2 = CryptoHelper.ComputeSha256(input);

        Assert.Equal(hash1, hash2);
        Assert.Equal(64, hash1.Length);
        Assert.True(hash1.All(c => (c >= '0' && c <= '9') || (c >= 'a' && c <= 'f')));
    }

    [Fact]
    public void GenerateInstallationToken_ShouldBeAnonymousAndSecure()
    {
        string token1 = CryptoHelper.GenerateInstallationToken();
        string token2 = CryptoHelper.GenerateInstallationToken();

        Assert.NotEqual(token1, token2);
        Assert.True(token1.Length >= 32);
    }

    [Fact]
    public void GeneratePartyCode_ShouldFollowPartyFormat()
    {
        string code = CryptoHelper.GeneratePartyCode();

        Assert.StartsWith("RL-", code);
        Assert.Equal(7, code.Length); // RL-XXXX
    }

    [Fact]
    public void PasswordHashing_ShouldHashAndVerifyCorrectly()
    {
        string password = "AdminPassword@2026!";
        string hash = CryptoHelper.HashPassword(password);

        Assert.True(CryptoHelper.VerifyPassword(password, hash));
        Assert.False(CryptoHelper.VerifyPassword("WrongPassword123", hash));
    }
}

