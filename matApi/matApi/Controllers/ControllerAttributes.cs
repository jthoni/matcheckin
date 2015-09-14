using System.Web.Http.Filters;

// this adds the Access-Control-Allow-Origin header to allow the apis to be called from angularjs
public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
{
    public override void OnActionExecuted(HttpActionExecutedContext actionExecutedContext)
    {
        if (actionExecutedContext.Response != null)
            actionExecutedContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

        base.OnActionExecuted(actionExecutedContext);
    }
}