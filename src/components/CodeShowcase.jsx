import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context";
import { Code2, Copy, Check, Terminal, ShieldAlert, FileCode, Minus, Square, X } from "lucide-react";

const demoCodeSnippets = [
  {
    id: "api",
    title: "ASP.NET Core REST API",
    fileName: "OrderManagementController.cs",
    language: "csharp",
    badge: "Demo C# / .NET API Pattern",
    code: `// Demo Code: Synthetic ASP.NET Core Controller Pattern
[ApiController]
[Route("api/v1/[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class OrderManagementController : ControllerBase
{
    private readonly IOrderProcessingService _orderService;
    private readonly ILogger<OrderManagementController> _logger;

    public OrderManagementController(IOrderProcessingService orderService, ILogger<OrderManagementController> logger)
    {
        _orderService = orderService;
        _logger = logger;
    }

    /// <summary>
    /// Demo Endpoint: Validates customer order discount eligibility
    /// </summary>
    [HttpPost("validate-discount")]
    [ProducesResponseType(typeof(DiscountResultDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ValidateDiscount([FromBody] DiscountCheckRequestDto request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _logger.LogInformation("Demo: Validating discount request for Customer ID: {CustomerId}", request.CustomerId);
        var result = await _orderService.CalculateEligibleDiscountAsync(request);

        return Ok(result);
    }
}`,
  },
  {
    id: "oauth",
    title: "OAuth 2.0 Auth Wrapper",
    fileName: "GenericOAuthTokenService.cs",
    language: "csharp",
    badge: "Demo OAuth 2.0 Pattern",
    code: `// Demo Code: Generic Microsoft Identity Platform OAuth Token Service
public class GenericOAuthTokenService : IOAuthTokenService
{
    private readonly IConfidentialClientApplication _msalClient;
    private readonly MemoryCache _tokenCache = new(new MemoryCacheOptions());

    public GenericOAuthTokenService(IOptions<IdentityClientOptions> identityOptions)
    {
        _msalClient = ConfidentialClientApplicationBuilder
            .Create(identityOptions.Value.ClientId)
            .WithClientSecret(identityOptions.Value.ClientSecret)
            .WithAuthority(new Uri(identityOptions.Value.Authority))
            .Build();
    }

    public async Task<string> AcquireTokenAsync(string[] scopes)
    {
        string cacheKey = string.Join("_", scopes);
        if (_tokenCache.TryGetValue(cacheKey, out string cachedToken))
            return cachedToken;

        var authResult = await _msalClient.AcquireTokenForClient(scopes).ExecuteAsync();
        
        var cacheOptions = new MemoryCacheEntryOptions()
            .SetAbsoluteExpiration(authResult.ExpiresOn.AddMinutes(-5));
            
        _tokenCache.Set(cacheKey, authResult.AccessToken, cacheOptions);
        return authResult.AccessToken;
    }
}`,
  },
  {
    id: "linq",
    title: "EF Core LINQ Pattern",
    fileName: "CustomerRepository.cs",
    language: "csharp",
    badge: "Demo EF Core Pattern",
    code: `// Demo Code: Optimized EF Core LINQ Query Pattern
public async Task<PagedResult<CustomerDto>> GetActiveCustomersAsync(CustomerSearchFilter filter)
{
    IQueryable<Customer> query = _dbContext.Customers
        .AsNoTracking()
        .Include(c => c.Orders)
        .Where(c => c.IsActive && c.Region == filter.Region);

    if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
    {
        query = query.Where(c => c.FullName.Contains(filter.SearchTerm) || 
                                 c.Email.Contains(filter.SearchTerm));
    }

    int totalRecords = await query.CountAsync();

    var items = await query
        .OrderBy(c => c.FullName)
        .Skip((filter.PageIndex - 1) * filter.PageSize)
        .Take(filter.PageSize)
        .Select(c => new CustomerDto
        {
            Id = c.Id,
            FullName = c.FullName,
            TotalOrders = c.Orders.Count(o => o.Status == OrderStatus.Completed)
        })
        .ToListAsync();

    return new PagedResult<CustomerDto>(items, totalRecords, filter.PageIndex, filter.PageSize);
}`,
  },
  {
    id: "sql",
    title: "SQL Stored Procedure",
    fileName: "sp_CalculateOrderDiscount.sql",
    language: "sql",
    badge: "Demo T-SQL Pattern",
    code: `-- Demo Code: Synthetic T-SQL Stored Procedure Pattern
CREATE PROCEDURE [dbo].[sp_CalculateOrderDiscount]
    @CustomerId INT,
    @PromoCode VARCHAR(20),
    @OrderTotal DECIMAL(18,2),
    @IsValid BIT OUTPUT,
    @DiscountPercent DECIMAL(5,2) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (
            SELECT 1 FROM dbo.Promotions P
            INNER JOIN dbo.CustomerTiers CT ON P.RequiredTierId = CT.TierId
            WHERE CT.CustomerId = @CustomerId
              AND P.Code = @PromoCode
              AND P.ExpiryDate >= GETUTCDATE()
              AND P.IsActive = 1
        )
        BEGIN
            SET @IsValid = 1;
            SET @DiscountPercent = 15.00;
        END
        ELSE
        BEGIN
            SET @IsValid = 0;
            SET @DiscountPercent = 0.00;
        END
    END TRY
    BEGIN CATCH
        SET @IsValid = 0;
        SET @DiscountPercent = 0.00;
    END CATCH
END`,
  },
];

const CodeShowcase = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [activeTab, setActiveTab] = useState(demoCodeSnippets[0].id);
  const [copied, setCopied] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    const checkMac =
      typeof window !== "undefined" &&
      ((navigator.platform && navigator.platform.toUpperCase().indexOf("MAC") >= 0) ||
        (navigator.userAgent && navigator.userAgent.toUpperCase().indexOf("MAC") >= 0));
    setIsMac(checkMac);
  }, []);

  const currentSnippet = demoCodeSnippets.find((s) => s.id === activeTab);

  const handleCopy = () => {
    if (currentSnippet) {
      navigator.clipboard.writeText(currentSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="code-showcase" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Terminal size={14} />
            Clean Architecture Patterns
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Synthetic Demo <span className="text-gradient">Code Patterns</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-sm sm:text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Demonstration C#, ASP.NET Core, OAuth 2.0, and SQL design patterns illustrating clean code standards and architecture practices.
          </p>

          {/* Integrity & Demo Disclaimer Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs max-w-xl text-left">
            <ShieldAlert size={18} className="text-amber-400 shrink-0" />
            <span>
              <strong>Integrity Notice:</strong> All code examples below are synthetic, generic patterns created solely for technical demonstration. No proprietary company source code is used.
            </span>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6">
          {demoCodeSnippets.map((snip) => {
            const isActive = snip.id === activeTab;
            return (
              <button
                key={snip.id}
                onClick={() => setActiveTab(snip.id)}
                className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105"
                    : darkMode
                    ? "bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-cyan-400 shadow-xs"
                }`}
              >
                <Code2 size={15} />
                <span>{snip.title}</span>
              </button>
            );
          })}
        </div>

        {/* OS-Aware Simulated IDE / Code Terminal Window */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          {/* OS-Aware IDE Window Header Bar */}
          <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2">
            {isMac ? (
              /* macOS Window Control Header */
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 shrink-0" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80 shrink-0" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80 shrink-0" />
                <span className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">
                  {currentSnippet?.badge}
                </span>
              </div>
            ) : (
              /* Windows / Linux Visual Studio Code Control Header */
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-slate-800/80 text-[10px] sm:text-[11px] font-mono text-slate-300 border border-slate-700/60 truncate max-w-[150px] sm:max-w-none">
                  <FileCode size={13} className="text-cyan-400 shrink-0" />
                  <span className="truncate">{currentSnippet?.fileName}</span>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider hidden sm:inline">
                  {currentSnippet?.badge}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700 active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Code</span>
                  </>
                )}
              </button>

              {/* Windows Window Controls */}
              {!isMac && (
                <div className="hidden sm:flex items-center gap-3 text-slate-500 text-xs pl-3 border-l border-slate-800">
                  <Minus size={14} className="hover:text-white transition-colors" />
                  <Square size={11} className="hover:text-white transition-colors" />
                  <X size={14} className="hover:text-rose-400 transition-colors" />
                </div>
              )}
            </div>
          </div>

          {/* Code Viewer Body */}
          <div className="p-4 sm:p-6 overflow-x-auto text-left font-mono text-[11px] sm:text-sm leading-relaxed text-slate-200 bg-slate-950/90">
            <pre className="whitespace-pre">
              <code>{currentSnippet?.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeShowcase;
