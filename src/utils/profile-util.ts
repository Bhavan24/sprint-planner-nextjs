export async function get_current_user_info() {
    let value = await fetch('https://ipapi.co/json/');
    let result = await value.json();
    return result;
}
