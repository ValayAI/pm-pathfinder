
CREATE OR REPLACE FUNCTION public.get_users_with_multiple_active_subscriptions()
RETURNS TABLE (user_id uuid, subscription_count bigint) 
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT 
    user_id, 
    COUNT(*) as subscription_count
  FROM 
    public.subscriptions
  WHERE 
    active = true
  GROUP BY 
    user_id
  HAVING 
    COUNT(*) > 1
  ORDER BY 
    COUNT(*) DESC;
$$;
