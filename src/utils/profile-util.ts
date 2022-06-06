export async function get_current_user_info() {
    let value = await fetch('https://ipapi.co/json/');
    return await value.json();
}
